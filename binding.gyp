{
    "targets": [
        {
            "target_name": "gnuNodeTLS",
            "sources": [
                "gnuNodeTLS.cc"
            ]
        },
        {
            "target_name": "after_build",
            "type": "none",
            "dependencies": [
                "gnuNodeTLS"
            ],
            "actions": [
                {
                    "action_name": "symlink",
                    "inputs": [
                        "<@(PRODUCT_DIR)/gnuNodeTLS.node"
                    ],
                    "outputs": [
                        "<(module_root_dir)/gnuNodeTLS.node"
                    ],
                    "action": ["ln", "-s", "<@(PRODUCT_DIR)/gnuNodeTLS.node", "<(module_root_dir)/gnuNodeTLS.node"]
                }
            ]
        }
    ]
}
