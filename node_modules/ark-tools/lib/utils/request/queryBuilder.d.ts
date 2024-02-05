declare const queryStringBuilder: ({ filters, columnFilterName }: {
    filters: any;
    columnFilterName?: string | undefined;
}) => string;
export default queryStringBuilder;
