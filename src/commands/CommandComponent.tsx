import ArgComponent from "./ArgComponent";
import { Command } from "./Command";

export default function CommandComponent({ command }: {command: Command}) {
    //     name: string;
    // optional: boolean;
    // flag: string | null;
    // desc: string;
    // type: string;
    // default: string | null;
    // choices: string[] | null;
    // min: number | null;
    // max: number | null;
    // filter: string | null;
    return (
        <div>
            <h2 className="text-2xl">Command: {command.name}</h2>
            <p>Groups: {command.command.groups}</p>
            <p>group_descs: {JSON.stringify(command.command.group_descs)}</p>
            <p>annotations: {JSON.stringify(command.command.annotations)}</p>
            {command.getArguments().map((arg, index) => (
                <div key={index} className="my-2">
                    <ArgComponent arg={arg} />
                    <hr />
                </div>
            ))}
        </div>
    );
}