import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';


export default function AutoComplete() {
    return <>
    <TextInput className="bg-background" options={["apple", "apricot", "banana", "carrot"]} trigger="#" />
    </>
}