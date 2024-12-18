import DOMPurify from 'dompurify';
import Highlight from 'react-highlight'
import {ReactNode, useMemo} from "react";
import '@/pages/command/discord.css';
import {markup} from "../../lib/discord";
import {useDialog} from "../layout/DialogContext";

interface Author {
    name: string;
    url: string;
    icon_url: string;
}

interface Thumbnail {
    url: string;
}

interface Image {
    url: string;
}

interface Footer {
    text: string;
    icon_url: string;
}

interface Field {
    name: string;
    value: string;
    inline?: boolean;
}

interface Embed {
    title: string;
    description: string;
    color?: number;
    timestamp?: string;
    url?: string;
    author?: Author;
    thumbnail?: Thumbnail;
    image?: Image;
    footer?: Footer;
    fields?: Field[];
}

export interface DiscordEmbed {
    id: string;
    content: string;
    embeds?: Embed[];
    embed?: Embed;
    users?: { [key: string]: string };
    channels?: { [key: string]: string };
    roles?: { [key: string]: string };
}

function timestamp(stringISO?: string): string {
    const date = stringISO ? new Date(stringISO) : new Date(),
        dateArray = date.toLocaleString('en-US', { hour: 'numeric', hour12: false, minute: 'numeric' }),
        today = new Date(),
        yesterday = new Date(new Date().setDate(today.getDate() - 1)),
        tommorrow = new Date(new Date().setDate(today.getDate() + 1));

    return today.toDateString() === date.toDateString() ? `Today at ${dateArray}` :
        yesterday.toDateString() === date.toDateString() ? `Yesterday at ${dateArray}` :
            tommorrow.toDateString() === date.toDateString() ? `Tomorrow at ${dateArray}` :
                `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
}

export function Embed({json}: {json: DiscordEmbed}) {
    const embeds = [];
    if (json.embeds) {
        embeds.push(...json.embeds);
    }
    if (json.embed) {
        embeds.push(json.embed);
    }
    return (
        <div className="msgEmbed font-mono" id={json.id}>
            <div className="markup messageContent"><MarkupRenderer content={json.content} highlight={true} embed={json} /></div>
            {embeds.map((embed, index) => (
                <div className="" key={index}>
                    <div className="embed markup">
                        <div className="embedGrid" style={{ borderColor: embed.color ? `#${embed.color.toString(16).padStart(6, "0")}` : 'transparent' }}>
                            {embed.author && (
                                <div className="embedAuthor embedMargin">
                                    {embed.author.icon_url && <img className="embedAuthorIcon embedAuthorLink" src={embed.author.icon_url} alt="Author Icon" />}
                                    {embed.author.url ? (
                                        <a className="embedAuthorNameLink embedLink embedAuthorName" href={embed.author.url} target="_blank" rel="noopener noreferrer">
                                            {embed.author.name}
                                        </a>
                                    ) : (
                                        <span className="embedAuthorName">{embed.author.name}</span>
                                    )}
                                </div>
                            )}
                            {embed.title && (
                                <div className="embedTitle embedMargin">
                                    {embed.url ? (
                                        <a className="anchor" target="_blank" href={embed.url} rel="noopener noreferrer">
                                            <MarkupRenderer content={embed.title} highlight={false} embed={json} />
                                        </a>
                                    ) : (
                                        <MarkupRenderer content={embed.title} highlight={false} embed={json} />
                                    )}
                                </div>
                            )}
                            {embed.description && <div className="embedDescription embedMargin"><MarkupRenderer content={embed.description} highlight={true} embed={json} /></div>}
                            {embed.fields && (
                                <EmbedFields fields={embed.fields} />
                            )}
                            {embed.image && (
                                <div className="imageWrapper clickable embedMedia embedImage">
                                    <img className="img embedImageLink" src={embed.image.url} alt="Embed Image" />
                                </div>
                            )}
                            {embed.thumbnail && (
                                <div className="imageWrapper clickable embedThumbnail">
                                    <img className="img embedThumbnailLink" src={embed.thumbnail.url} alt="Embed Thumbnail" />
                                </div>
                            )}
                            {embed.footer && (
                                <div className="embedFooter embedMargin">
                                    {embed.footer.icon_url && <img className="embedFooterIcon embedFooterLink" src={embed.footer.icon_url} alt="Footer Icon" />}
                                    <span className="embedFooterText">
                                        {embed.footer.text}
                                        {embed.timestamp && <span className="embedFooterSeparator">•</span>}
                                        {embed.timestamp && timestamp(embed.timestamp)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            <div className="emptyTxt"></div>
        </div>
    );
}

export default function MarkupRenderer({content, highlight, embed, showDialog}: {content: string, highlight: boolean, embed?: DiscordEmbed, showDialog?: (title: string, message: ReactNode, quote?: boolean) => void}): ReactNode {
    const sanitized = //useMemo(() => {return
        // DOMPurify.sanitize
    content ? (markup({
            txt: content,
            replaceEmoji: true,
            embed: embed,
            showDialog: showDialog
        })) : null;
    //}, [content]);
    if (!sanitized) return null;
    if (highlight) {
        return (
            <Highlight innerHTML={true}>
                {sanitized}
            </Highlight>
        );
    }
    return (
        <span dangerouslySetInnerHTML={{ __html: sanitized }} />
    );
}

export function EmbedFields({fields}: {fields: Field[]}): JSX.Element {
        const createEmbedFields = () => {
        let colNum = 1;
        let num = 0;
        let index: number | undefined;
        let gridCol: string | undefined;

        return fields.map((f, i) => {
            if (!f.name || !f.value) return null;

            if (fields[i].inline && fields[i + 1]?.inline &&
                ((i === 0 && fields[i + 2] && !fields[i + 2].inline) || (
                    i > 0 && !fields[i - 1].inline ||
                    i >= 3 && fields[i - 1].inline && fields[i - 2].inline && fields[i - 3].inline && (fields[i - 4] ? !fields[i - 4].inline : !fields[i - 4])
                ) && (i === fields.length - 2 || !fields[i + 2].inline)) || i % 3 === 0 && i === fields.length - 2) {
                index = i;
                gridCol = '1 / 7';
            }

            if (index === i - 1) gridCol = '7 / 13';

            const fieldElement = (
                <div
                    key={i}
                    className={`embedField ${num}${gridCol ? ' colNum-2' : ''}`}
                    style={{ gridColumn: gridCol || `${colNum} / ${colNum + 4}` }}
                >
                    <div className="embedFieldName">
                        <MarkupRenderer content={f.name} highlight={false} />
                    </div>
                    <div className="embedFieldValue">
                        <MarkupRenderer content={f.value} highlight={false} />
                    </div>
                </div>
            );

            if (index !== i) gridCol = undefined;

            colNum = (colNum === 9 ? 1 : colNum + 4);
            num++;

            return fieldElement;
        });
    };

    return (
        <div className="embedFields" style={{ display: 'grid' }}>
            {createEmbedFields()}
        </div>
    );
}