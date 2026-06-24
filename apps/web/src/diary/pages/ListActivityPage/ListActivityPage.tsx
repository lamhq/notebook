import Toolbar, { LeftArea, RightArea } from '../../../common/components/Toolbar';
import { Title } from '../../../common/templates/MainLayout';
import AddActivityButton from '../../components/AddActivityButton';
import ActivityListContainer from '../../containers/ActivityListContainer';
import RevenueContainer from '../../containers/RevenueContainer';
import SearchButtonContainer from '../../containers/SearchButtonContainer';

export default function ListActivityPage() {
  return (
    <>
      <Title>Activities</Title>

      <Toolbar>
        <LeftArea>
          <AddActivityButton />
          <SearchButtonContainer />
        </LeftArea>
        <RightArea>
          <RevenueContainer />
        </RightArea>
      </Toolbar>

      <ActivityListContainer />
    </>
  );
}
