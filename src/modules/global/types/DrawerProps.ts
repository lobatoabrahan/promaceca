export interface DrawerPropsTypes {
    isOpen: boolean;
    onClose: () => void;
    id: number;
    onSuccess?: () => void;
}