import {Link} from "react-router-dom";


export default function GraphList() {
    return (
        <>
            <div className="text-xl font-bold mb-4">
                This is a collection of premade graphs
            </div>
            <ul className="list-disc pl-5">
                <li className="mb-2">
                    <Link to={`${process.env.BASE_PATH}col_mil_graph`}>
                        Coalition Militarization
                    </Link>
                </li>
                <li>
                    <Link to={`${process.env.BASE_PATH}col_tier_graph`}>
                        Coalition Tiering
                    </Link>
                </li>
                <li>
                    <Link to={`${process.env.BASE_PATH}tradepricebyday`}>
                        Trade Price By Day
                    </Link>
                </li>
            </ul>
        </>
    );
}