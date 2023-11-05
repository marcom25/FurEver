
import { Card } from 'react-bootstrap';
import {GoodResponse} from '../GoodResponse';
import {BadResponse} from '../BadResponse';

export const Response = ({ success, fail, successText, failText }) => {
  return (
    <Card.Body>
      {success && <GoodResponse text={successText} />}
      {fail && <BadResponse text={failText} />}
    </Card.Body>
  );
};


