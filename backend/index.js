const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { readJsonFile, writeJsonFile } = require("./utils");

const seatList = __dirname + "/app-data/seat-list.json";
const PORT = 8001;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/seat-list", (_, res) => {
    readJsonFile(seatList)
        .then((seats) => res.json(seats))
        .catch((err) => res.status(500).json({ err }));
});

app.put("/seat-list/status-change", (req, res) => {
    const seatId = req.body.seatId;
    const justBooked = Date.now();
    readJsonFile(seatList)
        .then((seats) =>
            seats.map((seat) => {
                if (seat.id === seatId) {
                    return {
                        ...seat,
                        reserved: true,
                        bookedAt: justBooked,
                    };
                } else {
                    return seat;
                }
            })
        )
        .then((newSeatListArray) => writeJsonFile(seatList, newSeatListArray))
        .then((newSeatListArray) => res.json(newSeatListArray))
        .catch((err) => res.status(500).json({ err }));
});

app.put("/seat-list/status-free", (_, res) => {
    readJsonFile(seatList)
        .then((seats) =>
            seats.map((seat) => {
                return {
                    ...seat,
                    reserved: false,
                    bookedAt: "",
                };
            })
        )
        .then((newSeatListArray) => writeJsonFile(seatList, newSeatListArray))
        .then((newSeatListArray) => res.json(newSeatListArray))
        .catch((err) => res.status(500).json({ err }));
});

app.listen(PORT, () => console.log("Server listens at:", PORT));
