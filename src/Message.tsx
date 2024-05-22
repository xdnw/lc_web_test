function Message({myVal}: {myVal: number}) {
    const name = "Jesse";
    const test = 1;
    if (name === "Jesse") {
        return <h1>val:{myVal} Blah blah {name} {test == 1 ? "is one" : "not one"}</h1>;
    } else {
        return <h1>Hello World {name}</h1>;
    }
}

export default Message;