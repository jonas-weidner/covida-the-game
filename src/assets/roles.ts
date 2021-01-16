import { Role } from "@/types";

export const roles: Role[] = [
    {
        name: "Krisenmanager",
        color: "#19EBF1",
        actions: [
            "Der Krisenmanager darf mit 1 Aktion 1 Ereigniskarte aus\n" +
            "dem Spielerkarten-Ablagestapel heraussuchen und offen\n" +
            "auf seine Rollenkarte legen. Er darf aber stets nur eine\n" +
            "Karte auf einmal dort liegen haben. Die Ereigniskarte zählt\n" +
            "nicht zu seinem Handkartenlimit.",
            "Der Krisenmanager darf diese Ereigniskarte ganz normal\n" +
            "spielen. Danach kommt sie aus dem Spiel (statt auf den\n" +
            "Spielerkarten-Ablagestapel)."
        ]
    },
    {
        name: "Logistiker",
        color: "#E37EC9",
        actions: [
            "Der Logistiker darf mit 1 Aktion eine Spielfigur in eine beliebige Stadt bewegen," +
            " in der bereits die Spielfigur eines anderen Spielers steht",
            "Der Logistiker darf mit 1 Aktion eine beliebige Spielfigur so bewegen, als wäre es" +
            " seine eigene."
        ],
        notes: "Bewegst du als Logistiker eine Spielfigur so, als wäre es deine eigene,\n" +
            "müssen Karten für eventuelle Charter- und Direktflüge aus deiner Hand\n" +
            "kommen. Wirfst du eine Karte für eine Charterflug ab, muss die Karte\n" +
            "dem Standort dieser Spielfigur entsprechen."
    },
    {
        name: "Sanitäter",
        color: "#E38128",
        actions: [
            "Wenn der Sanitäter die Aktion „Seuche behandeln“\n" +
            "durchführt, entfernt er nicht nur 1 Seuchenwürfel aus der\n" +
            "Stadt, sondern gleich alle Würfel einer Farbe.",
            "Würfel von Seuchen, die bereits geheilt sind, entfernt\n" +
            "er ab dann sogar automatisch, ohne dafür Aktionen\n" +
            "aufwenden zu müssen. Seine reine Präsenz in einer Stadt\n" +
            "reicht dafür aus."
        ],
        notes: "Die Fähigkeit, alle Würfel von geheilten Seuchen automatisch\n" +
            "aus einer Stadt zu entfernen, tritt auch dann in Kraft, wenn\n" +
            "der Sanitäter vom Logistiker oder mit der Ereigniskarte „Freiflug“\n" +
            "in eine Stadt bewegt wird."
    },
    {
        name: "Betriebsexperte",
        color: "#1BCF68",
        actions: [
            "Der Betriebsexperte darf mit 1 Aktion ein Forschungszentrum in der Stadt \n" +
            "errichten, in der er sich gerade befindet, ohne dafür eine Stadtkarte abwerfen\n" +
            "(oder verwenden) zu müssen",
            "Der Betriebsexperte darf mit 1 Aktion einmal in seinem Zug eine beliebige \n" +
            "Stadtkarte abwerfen, um sich von einer Stadt mit Forschungszentrum in eine\n" +
            "beliebige andere Stadt zu bewegen."
        ],
        notes: "Wenn der Logistiker den Betriebsexperten bewegt, darf er nur\n" +
            "normale Bewegungsaktionen durchführen, niemals die besondere\n" +
            "Bewegungsfähigkeit des Betriebsexperten."
    },
    {
        name: "Quarantäne-Spezialistin",
        color: "#156B28",
        actions: [
            "Die Quarantäne-Spezialistin verhindert Ausbrüche und das\n" +
            "Platzieren von neuen Seuchenwürfeln sowohl an ihrem\n" +
            "momentanen Standort als auch in jeder Stadt, die mit ihrem\n" +
            "Standort verbunden ist. Sie beeinfl usst keine Würfel, die\n" +
            "während der Spielvorbereitung platziert werden."
        ]
    },
    {
        name: "Forscherin",
        color: "#A75D06",
        actions: [
            "Die Forscherin darf bei der Aktion „Wissen teilen“ Folgendes\n" +
            "tun: Anstelle der zur Stadt passenden Karte, darf sie einem\n" +
            "Mitspieler, der mit ihr in einer Stadt steht, eine beliebige\n" +
            "Stadtkarte geben (aber nicht erhalten!). Das gilt auch, wenn\n" +
            "der Mitspieler die Aktion am gemeinsamen Standort auslöst."
        ]
    },
    {
        name: "Wissenschaftlerin",
        color: "#8E2CEB",
        actions: [
            "Die Wissenschaftlerin benötigt nur 4 Stadtkarten der\n" +
            "gleichen Farbe (und nicht 5), um das Heilmittel für die\n" +
            "Seuche der jeweiligen Farbe zu entdecken."
        ]
    }
];
