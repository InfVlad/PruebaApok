import { type FC, useEffect, useState } from 'react';
import { getAllNodes } from '../lib/utils';
import { Node } from '../types/nodes';

interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = ({ text }) => {
  const [data, setData] = useState<Node[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllNodes();
        if (response.status !== 200) {
          console.log('Error, status code: ', response.status);
          return;
        }
        console.log(response.data)
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    void getData();
  }, []);

  return <div>{text}</div>;
};

export default Button;
