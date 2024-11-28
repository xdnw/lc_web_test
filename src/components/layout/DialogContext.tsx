import React, { createContext, useContext, useState, ReactNode } from 'react';
import SimpleDialog from "../ui/simple-dialog";

type DialogContextType = {
    showDialog: (title: string, message: ReactNode, quote?: boolean) => void;
    hideDialog: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dialogProps, setDialogProps] = useState<{ title: string, message: ReactNode, quote?: boolean }>({ title: '', message: '' });
    const [isDialogVisible, setDialogVisible] = useState(false);

    const showDialog = (title: string, message: ReactNode, quote: boolean = false) => {
        setDialogProps({ title, message, quote });
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    return (
        <DialogContext.Provider value={{ showDialog, hideDialog }}>
            {children}
            <SimpleDialog
                title={dialogProps.title}
                message={dialogProps.message}
                quote={dialogProps.quote}
                showDialog={isDialogVisible}
                setShowDialog={setDialogVisible}
            />
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