{
    "targets": [
        {
            "target_name": "simpleTCPclient",
            "sources": [
                "simpleTCPclient.cc"
            ]
        },
        {
            "target_name": "after_build",
            "type": "none",
            "dependencies": [
                "simpleTCPclient"
            ],
            "actions": [
                {
                    "action_name": "symlink",
                    "inputs": [
                        "<@(PRODUCT_DIR)/simpleTCPclient.node"
                    ],
                    "outputs": [
                        "<(module_root_dir)/simpleTCPclient.node"
                    ],
                    "action": ["ln", "-s", "<@(PRODUCT_DIR)/simpleTCPclient.node", "<(module_root_dir)/simpleTCPclient.node"]
                }
            ]
        }
    ]
}
