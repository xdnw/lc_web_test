// const [id, setId] = useState<number>(6);
    // const location = useLocation();
    // const search = location.search.substring(1); // remove the '#' at start
    // const params = new URLSearchParams(search);
    // const key = params.get('key') as string;

    // if (key) {
    //     pnwkit.setKeys(key);
    // }

    // const handleClick = async () => {
    //     if (!key) {
    //         alert("No key provided. Set `key` in the URL query parameters.");
    //         return;
    //     } 
    //     const name = await fetchName(id);
    //     alert("Name: " + name);
    // }
    // async function fetchName(id: number) {
//     const nations: nation[] = await pnwkit.nationQuery({id: [id], first: 1}, `nation_name`);
//     console.log("Nations: ", nations);
//     return nations[0].nation_name;
// }