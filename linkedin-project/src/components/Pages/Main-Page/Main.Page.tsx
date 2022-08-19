import './Main.Page.css'

import React from 'react';
import Categories from '../../Categoties/Categories';
import Result from '../../Result/Result';
import AddPost from '../../Add-Post/Add.Post';

const MainPage: React.FC = () => {
  return (
    <>
        <div className="main">
            <div className="container">
              <div className="main__inner">
                <div>
                  <Result />
                </div>

                <div>
                  <AddPost />
                </div>
              
                <div>
                  <Categories />
                </div>
              </div>
            </div>
        </div>
    </>
  );
}

export default MainPage;
