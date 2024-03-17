import {
    Group,
    PanelHeader,
    SplitLayout,
    useAdaptivityConditionalRender,
    usePlatform,
    SplitCol,
    Panel,
    Cell,
    Placeholder,
    View,
} from "@vkontakte/vkui";
import { useState } from "react";
import { GetFact } from "./components/getFact/GetFact.tsx";
import { GetAge } from "./components/getAge/GetAge.tsx";

const panels: Array<string> = ["Get fact", "Get age"];

export const App = () => {
    const platform = usePlatform();
    const { viewWidth } = useAdaptivityConditionalRender();
    const [panel, setPanel] = useState<string>(panels[0]);

    const isVKCOM = platform === "vkcom";

    return (
        <SplitLayout
            style={{ justifyContent: "center" }}
            header={!isVKCOM && <PanelHeader delimiter="none" />}
        >
            {viewWidth.tabletPlus && (
                <SplitCol
                    className={viewWidth.tabletPlus.className}
                    fixed
                    width={280}
                    maxWidth={280}
                >
                    <Panel>
                        {!isVKCOM && <PanelHeader />}
                        <Group>
                            {panels.map((i) => (
                                <Cell
                                    key={i}
                                    hovered={i === panel}
                                    onClick={() => setPanel(i)}
                                >
                                    {i}
                                </Cell>
                            ))}
                        </Group>
                    </Panel>
                </SplitCol>
            )}

            <SplitCol
                width="100%"
                maxWidth="560px"
                stretchedOnMobile
                autoSpaced
            >
                <View activePanel={panel}>
                    <Panel id={panels[0]}>
                        {/*<PanelHeader>Get fact</PanelHeader>*/}
                        <Group>
                            <Placeholder header="Get fact">
                                <GetFact />
                            </Placeholder>
                        </Group>
                    </Panel>
                    <Panel id={panels[1]}>
                        {/*<PanelHeader>Get age</PanelHeader>*/}
                        <Group>
                            <Placeholder header="Get age">
                                <GetAge />
                            </Placeholder>
                        </Group>
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>
    );
};
