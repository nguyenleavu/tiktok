import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import AccountItem, { dataProps } from '~/components/AccountItem/AccountItem';
import { ClearIcon, LoadingIcon, SearchIcon } from '~/components/Icon/Icon';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import useDebounce from '~/hook/useDebounce';
import * as request from '~/utils/request';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

type Props = {};

const Search = (props: Props) => {
    const [searchResult, setSearchResult] = useState<dataProps[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [showResult, setShowResult] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const inputRef = useRef<any>();

    const debounced = useDebounce(searchValue, 500);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {};

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        const fetchApi = async () => {
            request
                .get('users/search', {
                    params: {
                        q: debounced,
                        type: 'less',
                    },
                })
                .then((res) => {
                    setSearchResult(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    return (
        // Tippy warning
        <div>
            <Tippy
                visible={showResult && searchResult.length > 0}
                interactive
                render={(attrs) => (
                    <div
                        className={cx('search-result')}
                        tabIndex={-1}
                        {...attrs}
                    >
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((item: dataProps) => (
                                <AccountItem
                                    key={item.id}
                                    data={item}
                                    setSearchResult={setSearchResult}
                                />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('wrapper')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder='Search accounts and videos'
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear-btn')}
                            onClick={() => {
                                setSearchValue('');
                                setSearchResult([]);
                                inputRef.current.focus();
                            }}
                        >
                            <ClearIcon />
                        </button>
                    )}
                    {loading && (
                        <span className={cx('loading')}>
                            <LoadingIcon />
                        </span>
                    )}
                    <button
                        className={cx('search-btn')}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <SearchIcon />
                    </button>
                </div>
            </Tippy>
        </div>
    );
};

export default Search;
