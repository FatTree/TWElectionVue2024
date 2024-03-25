import type { AreaModel, ElectionModel, ProfileModel, TicketModel } from "~/models/DataModel";
import type { AreaViewModel, BasicViewModel, ElectionviewModel, ProfileViewModel, TicketViewModel } from "~/viewModels/DataViewModel";
import { PARTY, COLOR } from '~/assets/enum/enum';

const mappingPartyColor = (partyName: string): string | number => {
    let result: string | number = '';
    switch (partyName) {
        case PARTY.DPP:
            result = COLOR.DPP;
            break;

        case PARTY.KMT:
            result = COLOR.KMT;
            break;
        case PARTY.TPP:
            result = COLOR.TPP;
            break;

        case PARTY.NP:
            result = COLOR.NP;
            break;
    
        default:
            result = COLOR.OTHER;
            break;
    }
    return result;
}

export const electionFormatter = (model: ElectionModel): ElectionviewModel => ({ ...model});
export const codeFormatter = (model: any): string => {
    return `${model.prv_code}_${model.city_code}_${model.area_code}_${model.dept_code}_${model.li_code}`;
}
export const basicInfoFormatter = (model: any): BasicViewModel => {
    return {
        id: model.id,
        type: model.type,
        code: model.code,
    }
}
export const areaFormatter = (model: AreaModel): AreaViewModel => {
    const areaCode = `${model.prv_code}_${model.city_code}_${model.area_code}_${model.dept_code}_${model.li_code}`;
    
    return {...model, areaCode};
}
export const profileFormatter = (model: ProfileModel): ProfileViewModel => {
    const formatted_valid_ticket = (model.valid_ticket).toLocaleString('en');
    const formatted_invalid_ticket = (model.invalid_ticket).toLocaleString('en');
    const formatted_vote_ticket = (model.vote_ticket).toLocaleString('en');
    const formatted_vote_to_elect = model.vote_to_elect;
    
    return { ...model, formatted_invalid_ticket, formatted_valid_ticket, formatted_vote_ticket, formatted_vote_to_elect }
}

/**
 * ticketFormatter: 
 * 1. Combine the vice candidate to the same cand_no group
 * @param model 
 * @returns 
 */
export const ticketFormatter = (model: TicketModel[]): TicketViewModel[] => {
    let formattedModel: TicketViewModel[] = [];

    const cand = model.filter( (e) => ( e.is_vice.trim() === ''));
    const vice = model.filter( (e) => ( e.is_vice === 'Y'));
    
    for (let i = 0; i < cand.length; i++) {
        const can: TicketModel = cand[i];
        const formatted_ticket_num = (can.ticket_num).toLocaleString('en');
        const formatted_ticket_percent = can.ticket_percent;
        const vic: TicketModel = vice.find((e) => (e.cand_no === cand[i].cand_no));
        const party_color = mappingPartyColor(can.party_name);
        const group: TicketViewModel = {...can, vice: vic.cand_name, formatted_ticket_num, formatted_ticket_percent, party_color};
        formattedModel.push(group);
    }
    
    return formattedModel;
    // return Object.assign({}, formattedModel);
}

export const sortTicketFun = (a: TicketViewModel, b: TicketViewModel) => {
    if ( a.ticket_num > b.ticket_num) {
        return -1;
    } else {
        return 1;
    }
}