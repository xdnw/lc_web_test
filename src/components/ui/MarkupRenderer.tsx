import DOMPurify from 'dompurify';
import { toHTML } from 'discord-markdown';

export default function MarkupRenderer({content}: {content: string}) {
    return (
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(toHTML(content)) }} />
    );
}