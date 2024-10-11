import { Typography } from '@mui/material';

import './styles.scss';
import { texts } from '../../config';

export default function Footer(props: any) {
    return (
        <footer className="container-footer" style={{}}>
            <Typography
                variant="body2"
                color="textPrimary"
                align="center"
                {...props}>
                {`Copyright © ${texts.nameSystem} `}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    );
}
