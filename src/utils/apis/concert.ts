import { XMLParser } from 'fast-xml-parser';

const fetcherConcert = async (
    currentPage: number,
    startDate: string,
    endDate: string,
    rows: number
) => {
    const response = await fetch(
        `/api/concert?stdate=${startDate}&eddate=${endDate}&capge=${currentPage}&rows=${rows}`
    );
    const data = await response.text();
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        textNodeName: '_text',
    });
    const jsData = parser.parse(data);
    return jsData.dbs.db;
};

export const getConcertList = async (
    currentPage: number,
    startDate: string,
    endDate: string
) => {
    const data = await fetcherConcert(currentPage, startDate, endDate, 8);
    return Array.isArray(data) ? data : [data];
};

export const findTotalCount = async (startDate: string, endDate: string) => {
    const initialPages = [1, 5, 10];
    let start = initialPages[0];
    let end = initialPages[initialPages.length - 1];
    let totalPages = 11;
    let lastValidData = 0;

    const initialResults = await Promise.all(
        initialPages.map((page) =>
            fetcherConcert(page, startDate, endDate, 100)
        )
    );

    for (let i = 0; i < initialResults.length; i++) {
        if (!initialResults[i]) {
            end = initialPages[i] - 1;
            start = initialPages[i - 1] + 1;
            break;
        }
    }

    if (start <= end && end !== 10) {
        const midPages = Array.from(
            { length: end - start + 1 },
            (_, idx) => start + idx
        );
        const midResults = await Promise.all(
            midPages.map((page) =>
                fetcherConcert(page, startDate, endDate, 100)
            )
        );
        for (let i = 0; i < midResults.length; i++) {
            if (midResults[i].length < 100) {
                totalPages = midPages[i];
                lastValidData = midResults[i].length;
                break;
            }
        }
    }

    const totalCount = Math.ceil(((totalPages - 1) * 100 + lastValidData) / 8);

    return totalCount;
};
