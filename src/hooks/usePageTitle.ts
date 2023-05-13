import { useEffect, useState } from 'react';
import { useRedux } from '.';
import { changePageTitle } from 'redux/layout';

export default function usePageTitle(value: {
    title: string;
    breadCrumbItems: {
        label: string;
        path: string;
        active?: boolean;
    }[];
}) {
    const { dispatch } = useRedux();

    const [pageTitle] = useState(value);

    useEffect(() => {
        // set page title
        dispatch(changePageTitle(pageTitle));
    }, [dispatch, pageTitle]);
}
