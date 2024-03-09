import type { AreaModel, ElectionModel, ProfileModel, TicketModel } from "~/models/DataModel";

// ${prv_code}_${city_code}_${area_code}_${dept_code}_${li_code}
export type CodeGroup = {
    prv_code: string,
    city_code: string,
    area_code: string,
    dept_code: string,
    li_code: string,
}

export type Type = {
    type: string;
}

export type BasicViewModel = {
    id: string;
    type: string,
    code: string,
};

export type ElectionviewModel = ElectionModel;


/**
 * Profile
 */
export type ProfileViewModel = ProfileModel & {
    formatted_valid_ticket: string;
    formatted_invalid_ticket: string;
    formatted_vote_ticket: string;
    formatted_vote_to_elect: string;
}

/**
 *  * 2. Get tickets list 候選人票數細節
 *  - tickets: https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/${id}/${type}/${prv_code}_${city_code}_${area_code}_${dept_code}_${li_code}
 */
export type TicketViewModel = TicketModel & {
    vice: string;
    formatted_ticket_num: string;
    formatted_ticket_percent: string;
}

/** 
 * Area DropList
*/
export type AreaViewModel = AreaModel & {
    areaCode: string;
}
/**
 * Area Dropdown Selected
 */
export type AreaSelectedViewModel = {
    prv_code: string;
    city_code: string;
    area_code: string;
    dept_code: string;
    li_code: string;
    areaCode: string;
    areaName: string;
}
