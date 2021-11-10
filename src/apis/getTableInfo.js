import {
    getAllData,
    getDataWithId,
    postTutorial,
    postVoter
} from './operateOnDataApi';

import {
    windInfo
} from '../store/WINDinfo'

export const getHomeDetail = async () => {
    let result = [];
    const response = await getAllData();

    for (let i = 0; i < response.length; i++) {
        let _d = response[i];
        let short_name=_d.short_name;
        let time = _d.createdAt;
        let voters = _d.Voters;
        let votes = 0,
            rejects = 0;
        let voteradds = [];
        let title = _d.title;
        let content = _d.content;
        let link = _d.link;
        let id;
        let is_ended=_d.is_ended;

        Array.isArray(voters) && voters.forEach(item => {
            if (item.state === 'vote')
                votes++;
            else if (item.state === 'reject')
                rejects++;

            voteradds.push(item.pubkey);
        });
        let kk = {
            "propose_id":_d.id,
            "pubkey": _d.pubkey,
            "votes": votes,
            "rejects": rejects,
            "time": time,
            "voteradds": voteradds,
            "title": title,
            "content": content,
            "link": link,
            "short_name": short_name,
            "voters":voters,
            "is_ended":is_ended
        };
        result.push(kk);
    }
    windInfo.set(result);
    return result;
};

export const postProposer = async (payload) => {
    try {
        const response = await postTutorial(payload);
        return response;
    } catch (error) {
        console.error(error);
    }
};

// (async () => {
    //     let payload = {
    //         title: '4asJS Note',
    //         content: 'adf',
    //         link: 'asfwe',
    //         pubkey: 'asdfqwer',
    //         short_name:'{walletAddressShort}'    
    //         createdAt: '2021-10-21T16:28:20.000Z',
    //         updatedAt: '2021-10-21T16:28:20.000Z',
    //     };
    //     const _d = await postProposer(payload);
    // })();
