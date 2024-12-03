import React, { createContext, useContext, useState, ReactNode } from 'react';
import SimpleDialog from "../ui/simple-dialog";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../ui/tabs';

type DialogContextType = {
    showDialog: (title: string, message: ReactNode, quote?: boolean) => void;
    hideDialog: () => void;
};

type DialogProps = {
    title: string;
    message: ReactNode;
    quote?: boolean;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dialogs, setDialogs] = useState<DialogProps[]>([]);
    const [isDialogVisible, setDialogVisible] = useState(false);

    const showDialog = (title: string, message: ReactNode, quote: boolean = false) => {
        setDialogs(prevDialogs => [...prevDialogs, { title, message, quote }]);
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
        setDialogs([]);
    };

    return (
        <DialogContext.Provider value={{ showDialog, hideDialog }}>
            {children}
            {isDialogVisible && (
                <SimpleDialog
                    title={`${dialogs.length == 1 ? dialogs[0]?.title : 'Errors'}`}
                    message={
                        dialogs.length < 2 ? (
                            dialogs[0]?.message
                        ) : (
                            <Tabs defaultValue={"dialog-0"} className="w-[400px]">
                                <TabsList>
                                    {dialogs.map((dialog, index) => (
                                        <TabsTrigger key={index} value={`dialog-${index}`}>
                                            {dialog.title}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {dialogs.map((dialog, index) => (
                                    <TabsContent key={index} value={`dialog-${index}`}>
                                        {dialog.message}
                                    </TabsContent>
                                ))}
                            </Tabs>
                        )
                    }
                    showDialog={isDialogVisible}
                    setShowDialog={setDialogVisible}
                />
            )}
        </DialogContext.Provider>
    );
};

export const useDialog = (): DialogContextType => {
    const context = useContext(DialogContext);
    if (context === undefined) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};