import React, { Component, useRef } from "react";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import "@webscopeio/react-textarea-autocomplete/style.css";
import { Button } from "@/components/ui/button";

type ItemType = {
    name: string;
    value: string;
}
  
function Item({ entity: { name, value } }: { entity: ItemType }) {
    return <div>{name}</div>;
}


const stripPrefixes = ["get", "is", "can", "has"];

export default function AutoComplete2() {
    const rtaRef = useRef<ReactTextareaAutocomplete<ItemType> | null>(null);
  
    const onCaretPositionChange = (position: number) => {
      console.log(`Caret position is equal to ${position}`);
    };
  
    const resetCaretPosition = () => {
      rtaRef.current?.setCaretPosition(0);
    };
  
    const printCurrentCaretPosition = () => {
      const caretPosition = rtaRef.current?.getCaretPosition();
      console.log(`Caret position is equal to ${caretPosition}`);
    };
  
    return (
      <div className="app">
        <div className="controls">
          <Button variant="outline" size="sm" onClick={resetCaretPosition}>Reset caret position</Button>
          <Button variant="outline" size="sm" onClick={printCurrentCaretPosition}>Print current caret position to the console</Button>
        </div>
        <ReactTextareaAutocomplete
          className="my-textarea"
          loadingComponent={() => <span>Loading</span>}
          minChar={0}
          movePopupAsYouType={true}
          trigger={{
            "@": {
              dataProvider: (token: string) => {
                console.log("Current token " + token);
                return [
                  { name: "1", value: "@1" },
                  { name: "2", value: "@2" },
                  { name: "3", value: "@3" },
                  { name: "4", value: "@4" },
                  { name: "5", value: "@5" },
                  { name: "6", value: "@6" },
                  { name: "7", value: "@7" },
                  { name: "8", value: "@8" },
                  { name: "9", value: "@9" },
                  { name: "0", value: "@0" }
                ];
              },
              component: Item,
              output: (item: ItemType, trigger: string) => {
                console.log("Current item " + item, typeof(item), trigger);
                return item.value;
              }
            }
          }}
          ref={rtaRef}
          onCaretPositionChange={onCaretPositionChange}
        />
      </div>
    );
}