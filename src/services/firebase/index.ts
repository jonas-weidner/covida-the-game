import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import store from "@/store";
import UserCredential = firebase.auth.UserCredential;
import DocumentData = firebase.firestore.DocumentData;
import { City, CityCard, Game, Player, PlayingCard } from "@/types";

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
            curedDiseases: {
                yellow: false,
                red: false,
                black: false,
                blue: false
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

export const addOutbreak = async (): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    console.log(game);
    if (game) {
        const gameData = game.data() as Game;
        await games.doc(game.id).update("outbreaks", gameData.outbreaks + 1);
    }
};

export const removeOutbreak = async (): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        await games.doc(game.id).update("outbreaks", gameData.outbreaks - 1);
    }
};

export const increaseInfectionRate = async (): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        await games.doc(game.id).update("infectionRate", gameData.infectionRate + 1);
    }
};

export const decreaseInfectionRate = async (): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        await games.doc(game.id).update("infectionRate", gameData.infectionRate - 1);
    }
};

export const playHandCard = async (card: PlayingCard): Promise<void> => {
    const game = await findGame(store.getters.getCurrentGameCode);
    if (game) {
        const gameData = game.data() as Game;
        const players = gameData.players;
        const playerIndex = players
            .findIndex((player) => player.id === auth.currentUser?.uid);
        const cardIndex = players[playerIndex].playingCards
            .findIndex((deckCard) => deckCard.city?.city === card.city?.city);
        if (cardIndex !== -1) {
            players[playerIndex].playingCards.splice(cardIndex, 1);
            await games.doc(game.id).update("players", players);
            await games.doc(game.id)
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
