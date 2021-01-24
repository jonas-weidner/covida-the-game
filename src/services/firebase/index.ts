import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import store from "@/store";
import {
    City,
    CityCard,
    DiseaseState,
    DiseaseStates,
    Game,
    Player,
    PlayingCard,
    PlayingCardType
} from "@/types";
import { shuffleCards } from "@/services/gameActions";
import UserCredential = firebase.auth.UserCredential;
import DocumentData = firebase.firestore.DocumentData;

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MSSAGINGSENDERID,
    appId: process.env.VUE_APP_FIREBASE_APPID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const database = firebaseApp.firestore();
export const auth = firebaseApp.auth();
firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then();
export const games = database.collection("games");

const findGame = async (gameCode: string) => {
    const matchingGames = await games
        .where("gameCode", "==", gameCode)
        .limit(1).get();
    if (matchingGames.docs.length > 0)
        return matchingGames.docs[0];

    return null!;
};

export const getAuthorizedPlayers = async (): Promise<string[]> => {
    const snap = await database.collection("authorized").doc("family").get();
    return snap.data()?.players;
};

export const firebaseSignIn = async (email: string, password: string, type: "google"|"email"): Promise<UserCredential> => {
    try {
        if (type === "google") {
            const provider = new firebase.auth.GoogleAuthProvider();
            return await auth.signInWithPopup(provider);
        }
        return await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        return error;
    }
};

export const firebaseLogout = async (): Promise<void> => {
    try {
        return await auth.signOut();
    } catch (error) {
        return error;
    }
};

//eslint-disable-next-line
export const joinGame = async(gameCode: string, name: string): Promise<{success: boolean; error?: any}> => {
    try {
        const gameData = await findGame(gameCode);
        if (gameData) {
            const newPlayer = {
                id: auth.currentUser?.uid,
                name: name,
                activeTurn: false,
                playingCards: []
            };
            const game = gameData.data() as Game;
            if (game.players.length < game.numberOfPlayers) {
                await games.doc(gameData.id).update("players", [ ...game.players, newPlayer]);
                return { success: true };
            }
            return {
                success: false,
                error: { message: "Das Spiel ist bereits voll." }
            };
        }
        return {
            success: false,
            error: { message: "Kein Spiel gefunden." }
        };
    } catch (error) {
        return {
            success: false,
            error: error
        };
    }
};

export const gameId = (): string => store.getters.getGame?.id;
export const gameData = (): Game => store.getters.getGame;

// eslint-disable-next-line
export const createNewGame = async (gameCode: string, players: number, difficulty: number, name: string): Promise<DocumentData> => {
    try {
        return await games.add({
            gameCode: gameCode,
            numberOfPlayers: parseInt(players as any),
            difficulty: parseInt(difficulty as any),
            players: [
                {
                    id: auth.currentUser?.uid,
                    name: name,
                    activeTurn: false,
                    playingCards: []
                }
            ],
            finished: false,
            playerDeck: [],
            playerDiscardPile: [],
            infectionDeck: [],
            infectionDiscardPile: [],
            outbreaks: 0,
            infectionRate: 1,
            diseaseStates: {
                yellow: DiseaseState.NotFound,
                red: DiseaseState.NotFound,
                black: DiseaseState.NotFound,
                blue: DiseaseState.NotFound
            },
            cities: [],
            started: false,
            lastGameStates: []
        } as Game);
    } catch (error) {
        return error;
    }
};

export const saveCurrentGameState = async (game: Game): Promise<void> => {
    const lastStates = game.lastGameStates;
    if (lastStates.length === 5) lastStates.shift();
    delete game.lastGameStates;
    await games.doc(game.id).update("lastGameStates", [...lastStates, game]);
};

export const restoreLastGameState = async (): Promise<void> => {
    const game = gameData();
    if (game) {
        const lastStates = game.lastGameStates;
        if (lastStates && lastStates.length > 0) {
            const lastState = lastStates.pop()!;
            lastState.lastGameStates = lastStates;
            await games.doc(game.id).set(lastState);
        }
    }
};

export const exitGame = async (): Promise<void> => {
    const game = gameData();
    if (game) {
        const players = game.players;
        const index = players.findIndex((player) => player.id === auth.currentUser?.uid);
        players.splice(index, 1);
        await games.doc(game.id).update("players", players);
    }
};

export const updateAllPlayers = async (players: Player[]): Promise<void> => {
    await games.doc(gameId()).update("players", players);
};

export const setPlayerDeck = async (deck: PlayingCard[]): Promise<void> => {
    await games.doc(gameId()).update("playerDeck", deck);
};

export const setPlayerDiscardPile = async (deck: PlayingCard[]): Promise<void> => {
    await games.doc(gameId()).update("playerDiscardPile", deck);
};

export const initializeCities = async (cityArray: City[]): Promise<void> => {
    await games.doc(gameId()).set({ cities: cityArray }, { merge: true });
};

export const updateCities = async (cities: City[]): Promise<void> => {
    await games.doc(gameId()).update("cities", cities);
};

export const initializeInfectionDeck = async (infectionDeck: CityCard[]): Promise<void> => {
    await games.doc(gameId()).update("infectionDeck", infectionDeck);
};

export const initializeInfectionDiscardPile = async (infectionDiscardPile: CityCard[]): Promise<void> => {
    await games.doc(gameId()).update("infectionDiscardPile", infectionDiscardPile);
};

export const startGame = async (): Promise<void> => {
    await games.doc(gameId()).update("started", true);
};

export const changeOutbreaks = async (remove?: boolean): Promise<void> => {
    const game = gameData();
    if (game) {
        const value = remove ? game.outbreaks-1 : game.outbreaks+1;
        await games.doc(game.id).update("outbreaks", value);
    }
};

export const changeInfectionRate = async (remove?: boolean): Promise<void> => {
    const game = gameData();
    if (game) {
        const value = remove ? game.infectionRate-1 : game.infectionRate+1;
        await games.doc(game.id).update("infectionRate", value);
    }
};

//eslint-disable-next-line max-lines-per-function
export const playHandCard = async (card: PlayingCard, remove?: boolean): Promise<void> => {
    const game = gameData();
    if (game) {
        const players = game.players;
        const playerIndex = players
            .findIndex((player) => player.id === auth.currentUser?.uid);
        const cardIndex = players[playerIndex].playingCards
            .findIndex((deckCard) => {
                if (deckCard.type === PlayingCardType.City)
                    return deckCard.city?.city === card.city?.city;
                else if (deckCard.type === PlayingCardType.Action)
                    return deckCard.action?.name === card.action?.name;
                else if (deckCard.type === PlayingCardType.Pandemic)
                    return true;
                return false;
            });
        if (cardIndex !== -1) {
            players[playerIndex].playingCards.splice(cardIndex, 1);
            await games.doc(game.id).update("players", players);
            if (!remove) await games.doc(game.id)
                .update("playerDiscardPile", [...game.playerDiscardPile, card]);
        }
        await saveCurrentGameState(game);
    }
};

export const drawPlayingCard = async (): Promise<void> => {
    const game = gameData();
    if (game) {
        const players = game.players;
        const playerIndex = players
            .findIndex((player) => player.id === auth.currentUser?.uid);
        const playerDeck = game.playerDeck;
        const cardsToHand = [playerDeck.pop()!];
        await games.doc(game.id).update("playerDeck", playerDeck);
        players[playerIndex].playingCards =
            [...players[playerIndex].playingCards, ...cardsToHand];
        await games.doc(game.id).update("players", players);
        await saveCurrentGameState(game);
    }
};

export const pickupDiscardedPlayingCard = async (cardIndex: number): Promise<void> => {
    const game = gameData();
    if (game) {
        const discardPile = [...game.playerDiscardPile];
        const cardToUser = discardPile.splice(cardIndex, 1);
        const players = game.players;
        const playerIndex = players
            .findIndex((player) => player.id === auth.currentUser?.uid);
        players[playerIndex].playingCards = [...players[playerIndex].playingCards, ...cardToUser];
        await games.doc(game.id).update("playerDiscardPile", discardPile);
        await games.doc(game.id).update("players", players);
        await saveCurrentGameState(game);
    }
};

export const updatePlayerPlayingCards = async (cards: PlayingCard[], player: Player): Promise<void> => {
    const game = gameData();
    if (game) {
        const players = game.players;
        const playerIndex = players.findIndex((pl) => pl.id === player.id);
        players[playerIndex].playingCards = cards;
        await games.doc(game.id).update("players", players);
    }
};

export const drawInfectionCard = async (last?: boolean): Promise<void> => {
    const game = gameData();
    if (game) {
        const infectionDeck = [...game.infectionDeck];
        const newCard = last ? infectionDeck.pop() : infectionDeck.shift();
        await games.doc(game.id).update("infectionDeck", infectionDeck);
        const infectionDiscard = [...game.infectionDiscardPile, newCard];
        await games.doc(game.id).update("infectionDiscardPile", infectionDiscard);
        await saveCurrentGameState(game);
    }
};

export const shuffleAndBackOnTop = async (): Promise<void> => {
    const game = gameData();
    if (game) {
        const infectionDiscard = shuffleCards([...game.infectionDiscardPile]);
        const infectionDeck = [...infectionDiscard, ...game.infectionDeck];
        await games.doc(game.id).update("infectionDeck", infectionDeck);
        await games.doc(game.id).update("infectionDiscardPile", []);
        await saveCurrentGameState(game);
    }
};

export const changeDiseaseLevel = async (city: City, color: string, decrease?: boolean): Promise<void> => {
    const game = gameData();
    if (game) {
        const cities = game.cities;
        const cityIndex = cities.findIndex((cit) => cit.city === city.city);
        cities[cityIndex].diseaseCubes[color] = decrease
            ? city.diseaseCubes[color]-1
            : city.diseaseCubes[color]+1;

        await games.doc(game.id).update("cities", cities);
    }
};

export const nextPlayer = async (): Promise<void> => {
    const game = gameData();
    if (game) {
        const players = [...game.players];
        const playerIndex = players
            .findIndex((player) => player.id === auth.currentUser?.uid);
        players[playerIndex].activeTurn = false;
        const nextIndex = (playerIndex + 1) < players.length ? playerIndex + 1 : 0;
        players[nextIndex].activeTurn = true;
        await games.doc(game.id).update("players", players);
        await saveCurrentGameState(game);
    }
};

export const updateDiseaseStates = async (states: DiseaseStates): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game)
        await games.doc(game.id).update("diseaseStates", states);
};
