/*
 * id:
 * - id...
 * Type:
 * - N: Nation 
 * - C: Country
 * - D: District
 * - L: Li
 * Code: 
 * - ${prv_code}_${city_code}_${area_code}_${dept_code}_${li_code}
 *   - const nationCode = ref('00_000_00_000_0000');
 *   - const cityCode = ref('63_000_00_000_0000');
 *   - const districtCode = ref('63_000_00_010_0000');
 *   - const liCode = ref('63_000_00_010_0002');
*/
/** all service list
 * 1. Get election list
 *  - https://db.cec.gov.tw/static/elections/list/ELC_P0.json
 *  
 * APIs' Rule:
 * Parameters:
 *  - id, type, nationCode, cityCode, licode?
 *  - https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/${id}/C/${nationCode} res[nationCode]
 *  - https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/${id}/D/${cityCode} res[citycode]
 *  - https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/${id}/L/${cityCode} res[licode]
 * 
 * 2. Get tickets list 候選人票數細節
 *  - tickets: https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/${id}/${type}/${prv_code}_${city_code}_${area_code}_${dept_code}_${li_code}
 *    - cand_no
 *    - ticket_num
 *    - ticket_percent
 *    - is_victor
 *    - cand_name
 *    - is_vice
 * 
 * 3. Get Area list 台灣鄉村城鎮資料
 *  - id, typr, cityCode, liCode?
 *  - https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/${id}/${type}/${prv_code}_${city_code}_${area_code}_${dept_code}_${li_code}
 * 
 * 4. Get profiles list 總票數細節
 *  - https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/${id}/${type}/${prv_code}_${city_code}_${area_code}_${dept_code}_${li_code}
 */


import { LazyProfile } from "#build/components";
import { Logger } from "sass";
import type { AreaGroupModel, AreaModel, ElectionGroupModel, ElectionModel, ProfileGroupModel, ProfileModel, TicketGroupModel, TicketModel } from "~/models/DataModel";
import type { AreaSelectedViewModel } from "~/viewModels/DataViewModel";
import { AREA } from '~/assets/enum/enum';

const ELECTION_LIST_URL = 'https://db.cec.gov.tw/static/elections/list/ELC_P0.json';
const TICKET_URL = 'https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00';
const AREA_URL = 'https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00';
const PROFILE_URL = 'https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00';

/**
 * 
 * @returns [
    {
        "theme_id": "4d83db17c1707e3defae5dc4d4e9c800",
        "theme_group": "4d83db17c1707e3defae5dc4d4e9c800",
        "data_level": "N",
        "session": 16,
        "theme_name": "第16任總統副總統選舉",
        "prv_code": "00",
        "city_code": "000",
        "area_code": "00",
        "dept_code": "000",
        "li_code": "0000",
        "print_order": 0,
        "area_name": "全國"
    },
]
 */

const condition = (tp: string, rs: TicketModel, model?: AreaSelectedViewModel, liCode?: string, liModel?: AreaSelectedViewModel): boolean => {
    let baseCondition = ( rs.prv_code === model?.prv_code && rs.city_code === model?.city_code);
    if (tp === AREA.CITY) return baseCondition;
    
    if (tp !== AREA.CITY) {
        baseCondition = (
            baseCondition &&
            rs.area_code === model?.area_code && 
            rs.dept_code === model?.dept_code
    )}

    if (tp === AREA.VLI) {
        baseCondition = (
            baseCondition &&
            rs.li_code === liModel?.li_code
    )}
    return baseCondition;
}
export const getElectionData = async(): Promise<ElectionModel[]> => {
    try {
        const res: ElectionGroupModel = await $fetch(ELECTION_LIST_URL);
        return res[0].theme_items;
    } catch (error) {
        console.error(error);
    }
    return [];
}


export const getAreaData = async(id: string, type: string, code: string, liCode?: string): Promise<AreaModel[]> => {
    try {
        const res: AreaGroupModel = await $fetch(`${AREA_URL}/${id}/${type}/${code}.json`);
        if (type.trim() === 'L' && liCode) {
            return res[liCode]
        }
        return res[code];
    } catch (error) {
        console.error(error);
    }
    return [];
}

export const getProfileData = async(id: string, type: string, code: string, VModel?: AreaSelectedViewModel, liCode?: string): Promise<ProfileModel | ProfileModel[] | null> => {
    try {
        const res: ProfileGroupModel = await $fetch(`${PROFILE_URL}/${id}/${type}/${code}.json`);
        let result = res[code];
        
        if (type === 'N'){ 
            return result[0];
        }

        if (VModel) {
            const prv_code = VModel.prv_code;
            const city_code = VModel.city_code;
            const area_code = VModel.area_code;
            const dept_code = VModel.dept_code;
            const li_code = VModel.li_code;
            
            if (liCode) { result = res[liCode] }
            result = result.filter( (e) => {
                return e.prv_code === prv_code && e.city_code === city_code && e.area_code === area_code && e.dept_code === dept_code && e.li_code === li_code;
            });
        }
        return result[0];
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const getTicketWinnerSummary = async(id: string, type: string, code: string): Promise<TicketModel[]> => {
    try {
        const res: TicketGroupModel = await $fetch(`${TICKET_URL}/${id}/${type}/${code}.json`);
        const resCode: Array<TicketModel> = res[code];
        
        const groupByCity = resCode.reduce( (_ticketObg: {[key: string]: TicketModel[]}, _ticket: TicketModel) => {
            const { area_name } = _ticket;
            _ticketObg[area_name] = _ticketObg[area_name] ?? [];
            if(_ticket.is_vice.trim() === '') {
                _ticketObg[area_name].push(_ticket);
            }
            return _ticketObg;
        },{});

        let result: TicketModel[] = [];
        Object.values(groupByCity).forEach( val => {
            let max: TicketModel | null = null;
            val.forEach( (i: TicketModel) => {
                if ( max === null) {
                    max = i;
                } else {
                    max = (max.ticket_num < i.ticket_num ) ? i : max;
                }
            });
            if (max !== null) result.push(max);
        });
        return result;
    } catch (error) {
        console.error(error);
    }
    return [];
}


export const getTicketData = async(id: string, type: string, code: string, model?: AreaSelectedViewModel, liCode?: string, liModel?: AreaSelectedViewModel): Promise<TicketModel[]> => {
    try {
        const res: TicketGroupModel = await $fetch(`${TICKET_URL}/${id}/${type}/${code}.json`);
        console.log(`${TICKET_URL}/${id}/${type}/${code}.json`);
        console.log('type: '+ type +` ,code: `+ code);

        let resultObj: TicketModel[] = res[code];

        if (type === AREA.NATION) return resultObj;

        if (type === AREA.VLI && liCode) {
            resultObj = res[liCode];
        }
        
        if (type !== AREA.NATION) {
            return resultObj.filter( (r) => (condition(type, r, model, liCode, liModel) ));
        }
    } catch (error) {
        console.error(error);
    }
    return [];
}

