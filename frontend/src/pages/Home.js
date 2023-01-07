import { useState } from "react";

const Home = (props) => {
    const [selectSeats, setSelectSeats] = useState([]);
    const [seatPending, setSeatPending] = useState(false);

    const pendingSeat = (seat) => {
        setSelectSeats((oldArray) => {
            if (oldArray.includes(seat)) {
                return oldArray.filter((e) => e.id !== seat.id);
            } else {
                return [...oldArray, seat];
            }
        });
        setSeatPending(!seatPending);
    };

    const reserveSeat = (seatId) => {
        fetch("http://localhost:8001/seat-list/status-change", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ seatId }),
        })
            .then((res) => res.json())
            .then((newSeatListArray) => {
                props.setSeatList(newSeatListArray);
            });
    };

    return (
        <div>
            {props.seatList.map((seat) => (
                <div key={seat.id}>
                    <div
                        className={`seat 
                        ${
                            seat.reserved
                                ? "reserved"
                                : seatPending
                                ? "pending"
                                : seat.placement === "parquet"
                                ? "parquet"
                                : "loge"
                        }
                        `}
                        onClick={() =>
                            !seat.reserved ? pendingSeat(seat) : null
                        }
                    >
                        {seat.id}
                    </div>
                    <p>{seat.price}</p>
                </div>
            ))}
            <button
                onClick={() => {
                    selectSeats.map((seat) => reserveSeat(seat.id));
                    setSelectSeats([]);
                }}
            >
                Book now
            </button>
        </div>
    );
};

export default Home;
