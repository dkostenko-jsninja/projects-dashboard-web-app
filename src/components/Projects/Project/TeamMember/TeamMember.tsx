import React from 'react';
import './TeamMember.scss';

import { Button } from '@material-ui/core';

import { IDeveloper } from '../../../../interfaces/developer';

import noPhoto from '../../../../assets/images/no_photo.png';

type propTypes = {
  developer: IDeveloper;
  handler: Function;
};

function TeamMember({ developer, handler }: propTypes) {
  return (
    <div className="c-team-member">
      <img
        className="c-team-member__photo"
        src={developer.photo ? developer.photo : noPhoto}
        title={`${developer.firstName} ${developer.lastName}`}
        alt=""
        draggable="false"
      />
      <Button
        className="c-team-member__button"
        onClick={() => handler(developer.uuid)}
        color="secondary"
      >
        Remove
      </Button>
    </div>
  );
}

export default TeamMember;
