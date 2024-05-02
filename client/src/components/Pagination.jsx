import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getPosts } from "../actions/posts";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector(state => state.posts);
  const pages = new Array(numberOfPages).fill().map((_, index) => index + 1);
  const dispatch = useDispatch();
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    if(page) dispatch(getPosts(page));
  }, [dispatch, page]);

  const Page = ({ page, left, right, disabled }) => (
    <button className={`text-sm font-bold ${(left || right) ? 'p-2' : 'px-2.5 py-1'}`}>
      {page}
      {(left || right) && (
        <img 
          src={left 
            ? disabled 
              ? '/svgs/disabled-left-arrow.svg' 
              : '/svgs/left-arrow.svg'
            : disabled 
              ? '/svgs/disabled-right-arrow.svg' 
              : '/svgs/right-arrow.svg'
            } 
          alt={left 
            ? disabled ? 'disabled-left-arrow' : 'left-arrow' 
            : disabled ? 'disabled-right-arrow' : 'right-arrow'
          } 
          className="h-3 w-3"
        />
      )}
    </button>
  );

  const handleLeftTranslate = () => {
    const currPage = Number(page) - 1;

    const newTranslate = (numberOfPages > 5 && currPage > 5) ? translate + 48 : 0;

    setTranslate(newTranslate);
  };

  const handleTranslate = (e) => {
    const currPage = e.currentTarget.dataset.page;
    let newTranslate = translate;
    
    if(currPage < 5) newTranslate = 0;
    
    if(numberOfPages > 5 && currPage >= 5) newTranslate = currPage == numberOfPages ? translate : (4 - currPage) * 48;

    setTranslate(newTranslate);
  };

  const handleRightTranslate = () => {
    const currPage = Number(page) + 1;

    if(numberOfPages > 5 && currPage >= 5) {
      const newTranslate = currPage == numberOfPages ? translate : translate - 48;

      setTranslate(newTranslate);
    }
  };

  return (
    <div className='w-80 bg-white shadow-2xl max-lg:mx-auto rounded-lg overflow-hidden'>
      <ul className='flex items-center gap-3 px-2 py-1.5'>
        <li 
          className={`outline outline-1 outline-[#808080] hover:bg-[#ebebeb] rounded-full ${page == 1 && 'pointer-events-none outline-[#b5b5b5]'}`}
          onClick={handleLeftTranslate}
        >
          <Link to={`/posts?page=${Number(page) - 1}`}>
            {page == 1 ? <Page disabled left /> : <Page left />}
          </Link>
        </li>

        <div className={`w-[75%] p-0.5 overflow-hidden flex ${numberOfPages > 4 ? 'gap-5' : 'justify-around'}`}>
          {pages.map(pageNo => (
            <li 
              key={pageNo} 
              className={`outline outline-1 outline-[#808080] rounded-full ${page == pageNo ? 'bg-[#c5c5c5]' : 'hover:bg-[#ebebeb]'}`}
              data-page={pageNo}
              style={{ transform: `translateX(${translate}px)` }}
              onClick={(e) => handleTranslate(e)}
            >
              <Link to={`/posts?page=${pageNo}`}>
                <Page page={pageNo} />
              </Link>
            </li>
          ))}
        </div>

        <li 
          className={`outline outline-1 outline-[#808080] hover:bg-[#ebebeb] rounded-full ${page == numberOfPages && 'pointer-events-none outline-[#b5b5b5]'}`}
          onClick={handleRightTranslate}
        >
          <Link to={`/posts?page=${Number(page) + 1}`}>
            {page == numberOfPages ? <Page disabled right /> : <Page right />}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
