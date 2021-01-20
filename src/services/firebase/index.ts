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

// eslint-disable-next-line
export const createNewGame = async (gameCode: string, players: number, difficulty: number, name: string): Promise<DocumentData> => {
    try {
        return await games.add({
            gameCode: gameCode,
            numberOfPlayers: players,
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
            started: false
        } as Game);
    } catch (error) {
        return error;
    }
};

export const exitGame = async (): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const players = (game.data() as Game).players;
        const index = players.findIndex((player) => player.id === auth.currentUser?.uid);
        players.splice(index, 1);
        await games.doc(game.id).update("players", players);
    }
};

export const updateAllPlayers = async (players: Player[]): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) await games.doc(game.id).update("players", players);
};

export const setPlayerDeck = async (deck: PlayingCard[]): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) await games.doc(game.id).update("playerDeck", deck);
};

export const initializeCities = async (cityArray: City[]): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) await games.doc(game.id).set({ cities: cityArray }, { merge: true });
};

export const updateCities = async (cities: City[]): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) await games.doc(game.id).update("cities", cities);
};

export const initializeInfectionDeck = async (infectionDeck: CityCard[]): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) await games.doc(game.id).update("infectionDeck", infectionDeck);
};

export const initializeInfectionDiscardPile = async (infectionDiscardPile: CityCard[]): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) await games.doc(game.id).update("infectionDiscardPile", infectionDiscardPile);
};

export const startGame = async (): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) await games.doc(game.id).update("started", true);
};

export const changeOutbreaks = async (remove?: boolean): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        const value = remove ? gameData.outbreaks-1 : gameData.outbreaks+1;
        await games.doc(game.id).update("outbreaks", value);
    }
};

export const changeInfectionRate = async (remove?: boolean): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        const value = remove ? gameData.infectionRate-1 : gameData.infectionRate+1;
        await games.doc(game.id).update("infectionRate", value);
    }
};

//eslint-disable-next-line max-lines-per-function
export const playHandCard = async (card: PlayingCard, remove?: boolean): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        const players = gameData.players;
        const playerIndex = players
            .findIndex((player) => player.id === auth.currentUser?.uid);
        const cardIndex = players[playerIndex].playingCards
            .findIndex((deckCard) => {
                if (deckCard.type === PlayingCardType.City)
                    return deckCard.city?.city === card.city?.city;
                else if (deckCard.type === PlayingCardType.Action)
                    return deckCard.action?.name === card.action?.name;
                return false;
            });
        if (cardIndex !== -1) {
            players[playerIndex].playingCards.splice(cardIndex, 1);
            await games.doc(game.id).update("players", players);
            if (!remove) await games.doc(game.id)
                .update("playerDiscardPile", [...gameData.playerDiscardPile, card]);
        }
    }
};

export const drawPlayingCards = async (): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        const players = gameData.players;
        const playerIndex = players
            .findIndex((player) => player.id === auth.currentUser?.uid);
        const playerDeck = gameData.playerDeck;
        const cardsToHand = [playerDeck.pop() as PlayingCard, playerDeck.pop() as PlayingCard];
        await games.doc(game.id).update("playerDeck", playerDeck);
        players[playerIndex].playingCards =
            [...players[playerIndex].playingCards, ...cardsToHand];
        await games.doc(game.id).update("players", players);
    }
};

export const pickupDiscardedPlayingCard = async (cardIndex: number): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        const discardPile = [...gameData.playerDiscardPile];
        const cardToUser = discardPile.splice(cardIndex, 1);
        const players = gameData.players;
        const playerIndex = players
            .findIndex((player) => player.id === auth.currentUser?.uid);
        players[playerIndex].playingCards = [...players[playerIndex].playingCards, ...cardToUser];
        await games.doc(game.id).update("playerDiscardPile", discardPile);
        await games.doc(game.id).update("players", players);
    }
};

export const updatePlayerPlayingCards = async (cards: PlayingCard[], player: Player): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        const players = gameData.players;
        const playerIndex = players.findIndex((pl) => pl.id === player.id);
        players[playerIndex].playingCards = cards;
        await games.doc(game.id).update("players", players);
    }
};

export const drawInfectionCard = async (last?: boolean): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        const infectionDeck = [...gameData.infectionDeck];
        const newCard = last ? infectionDeck.shift() : infectionDeck.pop();
        await games.doc(game.id).update("infectionDeck", infectionDeck);
        const infectionDiscard = [...gameData.infectionDiscardPile, newCard];
        await games.doc(game.id).update("infectionDiscardPile", infectionDiscard);
    }
};

export const shuffleAndBackOnTop = async (): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        const infectionDiscard = shuffleCards([...gameData.infectionDiscardPile]);
        const infectionDeck = [...gameData.infectionDeck, ...infectionDiscard];
        await games.doc(game.id).update("infectionDeck", infectionDeck);
        await games.doc(game.id).update("infectionDiscardPile", []);
    }
};

export const changeDiseaseLevel = async (city: City, color: string, decrease?: boolean): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        const cities = gameData.cities;
        const cityIndex = cities.findIndex((cit) => cit.city === city.city);
        cities[cityIndex].diseaseCubes[color] = decrease
            ? city.diseaseCubes[color]-1
            : city.diseaseCubes[color]+1;

        await games.doc(game.id).update("cities", cities);
    }
};

export const nextPlayer = async (): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        const players = [...gameData.players];
        const playerIndex = players
            .findIndex((player) => player.id === auth.currentUser?.uid);
        players[playerIndex].activeTurn = false;
        const nextIndex = (playerIndex + 1) < players.length ? playerIndex + 1 : 0;
        players[nextIndex].activeTurn = true;
        await games.doc(game.id).update("players", players);
    }
};

export const updateDiseaseStates = async (states: DiseaseStates): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game)
        await games.doc(game.id).update("diseaseStates", states);
};
