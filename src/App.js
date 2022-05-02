import React, { useState } from 'react';

function New(props) {
  return (
      <div className="wrap-item wrap-item-new">
        <span className="label">New!</span>
        {props.children}
      </div>
  )
};

function Popular(props) {
  return (
      <div className="wrap-item wrap-item-popular">
        <span className="label">Popular!</span>
        {props.children}
      </div>
  )
};

function Article(props) {
  return (
      <div className="item item-article">
        <h3><a href="#">{props.title}</a></h3>
        <p className="views">Прочтений: {props.views}</p>
      </div>
  )
};

function Video(props) {
  return (
      <div className="item item-video">
        <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <p className="views">Просмотров: {props.views}</p>
      </div>
  )
};

function MyWrapper(Component) {
  // Возвращаем анонимный класс
  return class extends React.Component{
    render() {

      if (this.props.views > 1000)
      {
        console.log(this.props.views, 'Popular > 1000');

        return (
            <Popular>
              <Component {...this.props}/>;
            </Popular>
        );
      }
      else if (this.props.views < 100)
      {
        console.log(this.props.views, 'New < 100');

        return (
            <New>
              <Component {...this.props}/>;
            </New>
        );
      }
      else
      {
        console.log(this.props.views, 'Component');

        return <Component {...this.props}/>;
      }
    }
  }
}



function List(props) {
  return props.list.map(item => {
    switch (item.type) {
      case 'video':
        const MyWrap = MyWrapper(Video);

        return (
            <MyWrap {...item} />
//            <Video {...item} />
        );

      case 'article':
        const MyWrap2 = MyWrapper(Article);

        return (
            <MyWrap2 {...item} />
//            <Article {...item} />
        );
    }
  });
};

export default function App() {
  const [list, setList] = useState([
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      views: 50
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      views: 12
    },
    {
      type: 'article',
      title: 'Невероятные события в неизвестном поселке...',
      views: 175
    },
    {
      type: 'article',
      title: 'Секретные данные были раскрыты!',
      views: 1532
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      views: 4253
    },
    {
      type: 'article',
      title: 'Кот Бегемот обладает невероятной...',
      views: 12,
    },
  ]);

  return (
      <List list={list} />
  );
}
