import { Input } from "../ui/input";

export default function TextComponent({value, handleChange}:{value: string, handleChange: (value: string) => void}) {
    return <Input type="text" value={value} onChange={(e) => handleChange(e.target.value)} placeholder="Type here..." className="p-0 h-5" />
}