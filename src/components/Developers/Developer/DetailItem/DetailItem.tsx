import React from 'react';

type propTypes = {
  name: string;
  value: string;
};

function DetailItem({ name, value }: propTypes) {
  return (
    <>
      <p className="c-developer__detail">
        <span className="c-developer__detail__name">{name}</span>
        {value}
      </p>
    </>
  );
}

export default DetailItem;
