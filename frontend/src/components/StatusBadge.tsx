export const StatusBadge = ({ status = "Completado" }: { status?: string }) => {
    return (
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">
            {status}
        </span>
    );
};