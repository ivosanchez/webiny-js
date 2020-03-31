import * as React from "react";
import { Route } from "@webiny/react-router";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import PageBuilderSettings from "./components/PageBuilderSettings";
import GeneralSettings from "./components/generalSettings/GeneralSettings";
import { SecureRoute } from "@webiny/app-security/components";
import { i18n } from "@webiny/app/i18n";
import { getPlugins } from "@webiny/plugins";
import Helmet from "react-helmet";
import { PbMenuSettingsItem } from "@webiny/app-page-builder/types";

const t = i18n.ns("app-page-builder/admin/menus");

const plugins = [
    {
        type: "route",
        name: "route-settings-website",
        route: (
            <Route
                path="/settings/page-builder/website"
                render={() => (
                    <AdminLayout>
                        <Helmet title={t`Page Builder - Website Settings`} />
                        <SecureRoute roles={["pb-settings", "pb-editor"]}>
                            <PageBuilderSettings />
                        </SecureRoute>
                    </AdminLayout>
                )}
            />
        )
    },
    {
        type: "route",
        name: "route-settings-general",
        route: (
            <Route
                path="/settings/page-builder/general"
                render={() => (
                    <AdminLayout>
                        <Helmet title={t`Page Builder - General Settings`} />
                        <SecureRoute roles={["pb-settings"]}>
                            <GeneralSettings />
                        </SecureRoute>
                    </AdminLayout>
                )}
            />
        )
    },
    {
        type: "menu-settings",
        name: "menu-settings-page-builder",
        render({ Section, Item }) {
            return (
                <Section label={t`Page Builder`}>
                    {getPlugins("menu-settings-page-builder").map(plugin => {
                        return plugin.render<PbMenuSettingsItem>({ Item });
                    })}
                </Section>
            );
        }
    },
    {
        type: "menu-settings-page-builder",
        name: "menu-settings-website",
        render({ Item }) {
            return <Item label={t`Website`} path={"/settings/page-builder/website"} />;
        }
    },
    {
        type: "menu-settings-page-builder",
        name: "menu-settings-general",
        render({ Item }) {
            return <Item label={t`General`} path={"/settings/page-builder/general"} />;
        }
    }
];

export default plugins;
