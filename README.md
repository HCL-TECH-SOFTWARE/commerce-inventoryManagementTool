## Management-Center Asset for Inventory-Management

## WARRANTY & SUPPORT 
HCL Software provides HCL Commerce open source assets “as-is” without obligation to support them nor warranties or any kind, either express or implied, including the warranty of title, non-infringement or non-interference, and the implied warranties and conditions of merchantability and fitness for a particular purpose. HCL Commerce open source assets are not covered under the HCL Commerce master license nor Support contracts.

If you have questions or encounter problems with an HCL Commerce open source asset, please open an issue in the asset's GitHub repository. For more information about [GitHub issues](https://docs.github.com/en/issues), including creating an issue, please refer to [GitHub Docs](https://docs.github.com/en). The HCL Commerce Innovation Factory Team, who develops HCL Commerce open source assets, monitors GitHub issues and will do their best to address them. 

## HCL CMC Tooling Asset for Inventory-Management

**This asset is tested with HCL Commerce 9.1.10**

### Development Prerequisites

1. You must have access to a version 9.1 commerce transaction server. This can be either a toolkit or a runtime environment. The default configuration for the proxy expects this server to be running on localhost. Modify commerce-tooling/proxy.conf.json if your server is not running on localhost.
2. Your commerce transaction server must be started.
3. You must be able to log onto Management Center. The default user ID and password for the toolkit is wcsadmin/wcs1admin.
4. You must have node js installed (http://nodejs.org)

### Development Install

1. Clone or download this repository.
2. Navigate to the commerce-tooling directory in a command shell.
3. Issue `npm install`

### Development Server

Run `npm start` for a dev server. Navigate to https://localhost:7443/lobtools/cmc/ManagementCenter to launch Management Center. After you log
into Management Center you can access the tools provided by this single page application (SPA) through the hamburger menu. For example, select User Management
to open the User Management tool. The SPA is loaded in an iframe and routed to the selected tool.

If this is the first time you have launched Management Center from your browser, the new tools may not load in the iframe. Invoke the following URL in your
browser and then relaunch Management Center.

* https://localhost:7443/lobtools/cmc/Configure?featureName=localAdminConsole&featureEnabled=true

### Configuring with runtime backend

You can modify your frontend to work with a backend that is not a toolkit running on localhost. Modify commerce-tooling/proxy.conf.json by replacing references to localhost with your backend host name or IP address.

### Generate combined swagger json file

1. Install swagger-combine using the following command: `npm install -g swagger-combine`
1. Combine swagger into one swagger file: `swagger-combine swagger-combine.json > api_definition/swagger.json`

### Generate REST client

Run `npm run build-api` from the commerce-tooling directory.

### Compile the SPA assets for runtime

Run `npm run ng build` from the commerce-tooling directory. The compiled assets can be found in `commerce-tooling/build/dist`.

### Update the tooling docker image

The compiled assets in `commerce-tooling/build/dist` must be copied into the tooling-web docker image. The target
location within the docker image is `/SETUP/app/tooling/`. The out-of-the-box assets must be removed and replaced with
the new assets. For more information on deploying custom images refer to the HCL Help Center:
https://help.hcltechsw.com/commerce/9.0.0/install/tasks/tiginstall_updatedocker.html
