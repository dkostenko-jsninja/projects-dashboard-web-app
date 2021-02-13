import React from 'react';
import './Developer.scss';

import { IDeveloper } from '../../../interfaces/developer';

import noPhoto from '../../../assets/images/no_photo.png';

import ItemMenu from '../../ItemMenu';
import DetailItem from './DetailItem';

type propTypes = {
  developer: IDeveloper;
  buttons: { name: string; handler: Function }[];
};

function Developer({ developer, buttons }: propTypes) {
  const developerDetails = [
    {
      name: 'email',
      key: 'email',
    },
    {
      name: 'level',
      key: 'level',
    },
    {
      name: 'status',
      key: 'employeeStatus',
    },
  ];

  const handleMenuClick = (handler) => {
    handler(developer);
  };

  return (
    <div className="c-developer">
      <div className="c-developer__image-block">
        <img
          className="c-developer__image"
          src={developer.photo ? developer.photo : noPhoto}
          alt={`${developer.firstName} ${developer.lastName}`}
          draggable="false"
        />
      </div>

      <div className="c-developer__info">
        <p className="c-developer__name">{`${developer.firstName} ${developer.lastName}`}</p>

        <div className="c-developer__details">
          {developerDetails.map((detail) => (
            <DetailItem key={detail.key} name={detail.name} value={developer[detail.key]} />
          ))}
        </div>
      </div>

      <div className="c-developer__menu">
        <ItemMenu buttons={buttons} handleMenuClick={handleMenuClick} />
      </div>
    </div>
  );
}

export default Developer;
