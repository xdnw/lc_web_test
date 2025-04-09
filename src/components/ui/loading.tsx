export default function Loading({dark}: {dark?: boolean}) {
    return <div className="flex items-center justify-center p-2">
        <div
            className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 border-opacity-50"></div>
    </div>;
}