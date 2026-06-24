import { Title } from '../../../common/templates/MainLayout';
import AddActivityButton from '../../atoms/AddActivityButton';
import RevenueContainer from '../../containers/RevenueContainer';
import SearchButtonContainer from '../../containers/SearchButtonContainer';
import ActivityList from '../../organisms/ActivityList';
import Toolbar, { LeftArea, RightArea } from '../../organisms/Toolbar';

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

      <ActivityList />
    </>
  );
}
