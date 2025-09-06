interface IChronoParams {
    durationInMs: number;
}

const Chrono = (params: IChronoParams) => {
    return (
        <>
            <div>
                <span className="h1">
                    {format(params.durationInMs, "m")}:
                    {format(params.durationInMs, "s")}.
                </span>
                <span className="fw-bold">
                    {format(params.durationInMs, "ms")}
                </span>
            </div>
        </>
    );
};

const format = (durationInMs: number, timePart: "m" | "s" | "ms"): string => {
    switch (timePart) {
        case "m":
            const minutes = Math.floor(durationInMs / 60000);
            return String(minutes);

        case "s":
            const seconds = Math.floor(durationInMs / 1000) % 60;
            return String(seconds).padStart(2, "0");

        case "ms":
            const milliseconds = durationInMs % 1000;
            return String(milliseconds).padStart(3, "0");
    }
};

export default Chrono;
