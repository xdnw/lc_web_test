import { COMMANDS } from "../../lib/commands";

export default function Color({ colorId, beigeTurns }: { colorId: number | string, beigeTurns?: number }) {
    const color = Number.isInteger(colorId) ? COMMANDS.options.NationColor.options[colorId as number] : colorId + "";
    return (
        <div
            className="w-5 h-5 border border-2 border-black flex items-center justify-center"
            style={{ backgroundColor: `${color.replace("BEIGE", "TAN")}` }}
            title={`${color}`}
        >
            {beigeTurns !== undefined && beigeTurns > 0 && (
                <span className="text-xs text-black">{beigeTurns}</span>
            )}
        </div>
    );
}