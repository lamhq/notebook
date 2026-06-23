import { Title } from '../../../common/templates/MainLayout';
import AddActivityButton from '../../atoms/AddActivityButton';
import RevenueContainer from '../../containers/RevenueContainer';
import ActivityList from '../../organisms/ActivityList';
import SearchButton from '../../organisms/SearchButton';
import Toolbar, { LeftArea, RightArea } from '../../organisms/Toolbar';

export default function ListActivityPage() {
  return (
    <>
      <Title>Activities</Title>

      <Toolbar>
        <LeftArea>
          <AddActivityButton />
          <SearchButton />
        </LeftArea>
        <RightArea>
          <RevenueContainer />
        </RightArea>
      </Toolbar>

      <ActivityList />
    </>
  );
}
