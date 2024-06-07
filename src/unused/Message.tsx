export default function Message({myVal}: {myVal: number}) {
    const name = "John Doe";
    const test = 1;
    if (name === "John Doe") {
        return <h1>val:{myVal} Blah blah {name} {test == 1 ? "is one" : "not one"}</h1>;
    } else {
        return <h1>Hello World {name}</h1>;
    }
}