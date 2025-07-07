import { Button, ButtonProps } from "./ui/button";

type ActionIconProps = Partial<ButtonProps> & {
    children: React.ReactNode;
};

function ActionIcon({ children, ...buttonProps }: ActionIconProps) {
    return (
        <Button
            type="submit"
            variant="link"
            size="icon"
            className="w-9 h-9 hover:text-neutral-400 dark:hover:text-neutral-500"
            {...buttonProps}
        >
            {children}
        </Button>
    );
}
export default ActionIcon;
