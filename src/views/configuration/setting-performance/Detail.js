// ** Default Avatar Image
import { Fragment, useContext } from 'react'
import { Star } from 'react-feather'
import Rating from 'react-rating'
import { Button, ModalFooter, Row } from 'reactstrap'
import ImageRounded from '../../../components/widgets/image-rounded'
import Helper from '../../../helpers'
import DetailEventCore from './DetailEventCore'
import DetailRating from './DetailRating'
import DetailTrophy from './DetailTrophy'
import './settingPerformance.scss'

const Detail = (props) => {
    const {
        data,
        onClose,
        isEvent,
        themeColors
    } = props;


    const getInfoDetail = (data) => {
        if (isEvent == true || isEvent == false) {
            return (
                <DetailEventCore data={data} />
            )
        } else if (isEvent == "trophy") {
            return (
                <DetailTrophy data={data} />
            )
        } else if (isEvent == "rating") {
            return <DetailRating data={data} />
        }
    }

    return (
        <Fragment>
            <Row className="d-flex justify-content-center">
                {isEvent != "rating" ? <ImageRounded
                    src={isEvent == "trophy" ? data.icon : data.badge}
                    width={130}
                    height={130}
                /> :
                    <Rating
                        emptySymbol={<Star size={32} fill='#babfc7' stroke='#babfc7' />}
                        fullSymbol={<Star size={32} fill={themeColors.colors.warning.main} stroke={themeColors.colors.warning.main} />}
                        initialRating={data.rating}
                        readonly
                    />
                }
            </Row>
            {getInfoDetail(data)}

            <ModalFooter >
                <Button.Ripple
                    color="primary"
                    onClick={onClose}
                >
                    Tutup
                </Button.Ripple>
            </ModalFooter>
        </Fragment>
    );
};

export default Detail;