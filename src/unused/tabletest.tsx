import { StaticTable} from "../pages/custom_table";

export default function TableTest() {
    return (<>
        <StaticTable type="DBNation" selection="AA:Singularity" columns={[
            ["{nation_id}", "id test"],
            "{nation}",
            "{alliancename}",
            "{avg_infra}",
            "{avgland}",
            "{active_m}",
            "{soldiers}"
        ]} sort={{idx: 0, dir: "asc"}} />
    </>);
}