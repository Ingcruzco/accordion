let lastId = 0;

export default function UniqueComponentId(prefix = 'por_id_') {
    lastId++;

    return `${prefix}${lastId}`;
}
