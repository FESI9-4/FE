export interface ConcertCardProps {
    id: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
}

export interface Concert {
    area: string;
    fcltynm: string;
    genrenm: string;
    mt20id: string;
    openrun: string;
    poster: string;
    prfnm: string;
    prfpdfrom: string;
    prfpdto: string;
    prfstate: string;
    _text: string;
}
export interface ConcertDetail {
    area: string;
    child: string;
    daehakro: string;
    dtguidance: string;
    entrpsnm: string;
    entrpsnm1: string;
    entrpsnm2: string;
    entrpsnm3: string;
    fcltynm: string;
    genrenm: string;
    mt10id: string;
    mt20id: string;
    musicalcreate: string;
    musicallicense: string;
    openrun: string;
    pcseguidance: string;
    poster: string;
    prfage: string;
    prfcast: string;
    prfcrew: string;
    prfnm: string;
    prfpdfrom: string;
    prfpdto: string;
    prfruntime: string;
    prfstate: string;
    relates: {
        relate:
            | {
                  relatenm: string;
                  relateurl: string;
                  _text: string;
              }[]
            | {
                  relatenm: string;
                  relateurl: string;
                  _text: string;
              };
        _text: string;
    };
    sty: string;
    styurls:
        | {
              styurl: string[];
              _text: string;
          }
        | {
              styurl: string;
              _text: string;
          };
    ticket: string;
    updatedate: string;
    visit: string;
    _text: string;
}
