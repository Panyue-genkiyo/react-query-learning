import React from 'react';
import { useQuery } from 'react-query';
import axios from "axios";

const fetchUserByEmail = async (email) => {
    const { data } = await axios.get(`http://localhost:4000/users/${email}`);
    return data;
}

const fetchCoursesByChannelId = async (channelId) => {
    const { data } = await axios.get(`http://localhost:4000/channels/${channelId}`);
    return data;
}

//条件query 不进行上一个query无法进行下一个query
const DependentQueriesPage = ({ email }) => {

    const { data: user } =  useQuery(['user', email], () =>  fetchUserByEmail(email), {
        enabled: !!email,
    });

    const channelId = user?.channelId;
    //有了这个channelId就可以进行下一个query 条件query
    const { data: courses } = useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
        enabled: !!channelId //只有当channelId存在时才会运行这个query
    });

    return (
        <>
            <h2>DependentQueriesPage</h2>
            { courses?.courses.map((c, i) => <div key={i}>{c}</div>)  }
        </>
    );
};

export default DependentQueriesPage;
